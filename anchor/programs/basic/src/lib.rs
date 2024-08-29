use anchor_lang::prelude::*;

declare_id!("9ftAu7LaKw36iuZqNt7ZatTdnXGLnUKM6mCZ5FgEhnqC");

#[program]
pub mod basic {
    use super::*;

    pub fn greet(_ctx: Context<Initialize>) -> Result<()> {
        msg!("GM!");
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize {}
