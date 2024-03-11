import { ConvexError, v } from "convex/values";
import { MutationCtx, QueryCtx, internalMutation } from "./_generated/server";

export async function getUser(ctx: QueryCtx|MutationCtx, tokenIdentifier:string){
    
    const user =await ctx.db.query("users")
    .withIndex("by_tokenIdentifier",
    (q)=>q.eq('tokenIdentifier', tokenIdentifier)).first();
    if(!user){
        throw new ConvexError("User should be defined");
    }
    return user;
}

export const createUser = internalMutation({
    args:{orgIds:v.array(v.string()),tokenIdentifier:v.string()},
    async handler(ctx, args){
        await ctx.db.insert('users', {
            orgIds: args.orgIds,
            tokenIdentifier: args.tokenIdentifier,       
        })
    }
})
export const addOrgIdToUser = internalMutation({
    args :{ tokenIdentifier:v.string(), orgId:v.string()},
    async handler(ctx,args){
        const user = await getUser(ctx,args.tokenIdentifier);
        
        
        await ctx.db.patch(user._id,
        {
            orgIds:[...user.orgIds,args.orgId],
            
        });
    
    }
    
})