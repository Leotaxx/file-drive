import { ConvexError, v } from "convex/values";
import { MutationCtx, QueryCtx, mutation, query } from "./_generated/server";
import { getUser } from "./users";

async function hasAccessToOrg(
    tokenIdentifier:string,
    orgId:string,
    ctx:QueryCtx|MutationCtx,
){
    const user= await getUser(ctx,tokenIdentifier)
    const hasAccess=
        user.orgIds.includes(orgId)||
        user.tokenIdentifier.includes(orgId);
    return hasAccess;

}

export const createFile = mutation({
    args:{
        name: v.string(),
        orgId:v.string()
    },
    async handler(ctx,args){
        const identity = await ctx.auth.getUserIdentity();
        console.log(identity);
        if(!identity){
            throw new ConvexError("You must be signed in to create a file")
        }
        const hasAccess = await hasAccessToOrg(identity.tokenIdentifier,args.orgId,ctx);
        if(!hasAccess){
            throw new ConvexError("You don't have access to this file");
        }
        await ctx.db.insert('files',{
            name: args.name,
            orgId: args.orgId,
        }); 
    }, 
});

export const getFiles = query({
    args: {orgId:v.string()},
    async handler(ctx, args){
        const identity=await ctx.auth.getUserIdentity();
        if(!identity){
            return [];
        }
        const hasAccess = await hasAccessToOrg(identity.tokenIdentifier,args.orgId,ctx);
        if(!hasAccess){
            return [];
        }
        return ctx.db.query('files').withIndex("by_orgId", q=>
        q.eq('orgId',args.orgId)).collect();
    }, 
});
