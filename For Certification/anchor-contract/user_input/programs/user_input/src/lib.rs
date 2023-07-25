use anchor_lang::prelude::*;

//deployed using solana playground on devnet
declare_id!("8soeHxfXiasRH4FTRAD3D5JoxRcxHGo4xqK2E5GCHMHi");


#[program]
mod user_input {
    use super::*;
    pub fn initialize(ctx: Context<InsertData>, data: String) -> Result<()> {
        ctx.accounts.new_account.data = data.to_string();
        msg!("Your entry was {}", data);
        Ok(())
    }
}

#[derive(Accounts)]
pub struct InsertData<'info> {
    #[account(init, payer = signer, space = 8 + 32)]
<<<<<<< Updated upstream
    pub new_account: Account<'info,  UserInput>,
=======
    pub new_account: Account<'info, UserInput>,
>>>>>>> Stashed changes
    #[account(mut)]
    pub signer: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[account]
pub struct UserInput {
    data: String,
<<<<<<< Updated upstream
}
=======
}
>>>>>>> Stashed changes
