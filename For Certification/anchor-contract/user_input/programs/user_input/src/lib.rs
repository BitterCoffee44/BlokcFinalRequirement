use anchor_lang::prelude::;

declare_id!("9pLJrZrXoHjtRainTT9QxQ9PLrZ6jQXvD6PsCiDEkZUB");
//new 4LtkH6YwvR6mKDZMVWja2rsUWYNS82CDWdCPCbsWeGyM
//solana playground deployment: BNgaFszaVWZXGuxoerXmroZdRKfJwWyT7VfZ3CCUEZgU 

#[program]
mod user_input {
    use super::;
    pub fn initialize(ctx: Context<InsertData>, data: String) -> Result<()> {
        ctx.accounts.new_account.data = data.to_string();
        msg!("Your entry was {}", data);
        Ok(())
    }
}

#[derive(Accounts)]
pub struct InsertData<'info> {

    #[account(init, payer = signer, space = 8 + 32)]
    pub new_account: Account<'info,  UserInput>,
    #[account(mut)]
    pub signer: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[account]
pub struct UserInput {
    data: String,
}
'''
'''
use anchor_lang::prelude::;

declare_id!("4LtkH6YwvR6mKDZMVWja2rsUWYNS82CDWdCPCbsWeGyM");
//new 4LtkH6YwvR6mKDZMVWja2rsUWYNS82CDWdCPCbsWeGyM
//solana playground deployment: BNgaFszaVWZXGuxoerXmroZdRKfJwWyT7VfZ3CCUEZgU 

#[program]
mod user_input {
    use super::;
    pub fn initialize(ctx: Context<InsertData>, data: String) -> Result<()> {
        ctx.accounts.new_account.data = data.to_string();
        msg!("Your entry was {}", data);
        Ok(())
    }
}

#[derive(Accounts)]
pub struct InsertData<'info> {

    #[account(init, payer = signer, space = 8 + 32)]
    pub new_account: Account<'info,  UserInput>,
    #[account(mut)]
    pub signer: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[account]
pub struct UserInput {
    data: String,
}