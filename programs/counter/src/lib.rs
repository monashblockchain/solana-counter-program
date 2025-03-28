use anchor_lang::prelude::*;

declare_id!("Hx8vRhUw1Rg7nSRp7dEkpXTpwpuKFJCdHcEqinsgRKjy");

#[program]
pub mod counter {
    use super::*;

    pub fn add_public(ctx: Context<AddPublic>)->Result<()>{
        let public_counter = &mut ctx.accounts.public_counter;
        msg!("Public Counter Value for added to {}", public_counter.value);
        public_counter.value += 1;
        Ok(())
    }

    pub fn add_personal(ctx: Context<AddPersonal>)->Result<()>{
        let personal_counter = &mut ctx.accounts.personal_counter;
        
        // Update the Owner of the Personal Counter if it's still empty when initialized
        if personal_counter.owner == Pubkey::default() {
            personal_counter.owner = ctx.accounts.user.key();
        }
        // Check if the caller is the owner. Returns an error if false
        require!(personal_counter.owner == ctx.accounts.user.key(), Errors::InvalidOwner);
        
        msg!("Counter Value for {} added to {}", personal_counter.owner, personal_counter.value);
        personal_counter.value += 1;
        Ok(())
    }
}

/*
Example Account Context in Solana Anchor Program
*/
#[derive(Accounts)]
pub struct AddPublic<'info> {
    // This is the Counter Account
    #[account(
        init_if_needed, 
        payer = user, 
        space = PublicCounter::LEN,
        seeds=[b"public_counter".as_ref()],
        bump,
    )]
    pub public_counter: Account<'info, PublicCounter>,
    // This is User Signer
    #[account(mut)]
    pub user: Signer<'info>,
    // This is Solana System Program
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct AddPersonal<'info> {
    // This is the Counter Account
    #[account(
        init_if_needed, 
        payer = user, 
        space = PersonalCounter::LEN,
        seeds=[b"personal_counter".as_ref(), user.key().as_ref()],
        bump,
    )]
    pub personal_counter: Account<'info, PersonalCounter>,
    // This is User Signer
    #[account(mut)]
    pub user: Signer<'info>,
    // This is Solana System Program
    pub system_program: Program<'info, System>,
}

/*
These are the Solana Accounts created in the program

1. PublicCounter: has a value field which is a u64
2. PersonalCounter: has an owner which is a Pubkey and a value field which is a u64

Memory Size in Rust:
- u64 = 8 bytes,
- Pubkey = 32 bytes,
- bool = 1 byte

Note that each account in Solana needs 8 extra bytes as the discriminator of the account.
*/
#[account]
pub struct PublicCounter {
    pub value: u64,
}
impl PublicCounter{
    pub const LEN: usize = 8 + 8; // discriminator + u64
}


#[account]
pub struct PersonalCounter {
    pub owner: Pubkey,
    pub value: u64,
}
impl PersonalCounter{
    pub const LEN: usize = 8 + 32 + 8; // discriminator + Pubkey + u64
}


/* Example Error in Solana Anchor Program*/
#[error_code]
pub enum Errors {
    #[msg("Invalid owner")]
    InvalidOwner,

    #[msg("My Error Message")]
    MyErrorMessage,

    // Add More Error Messages here
}
