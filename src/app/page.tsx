"use client"
import { Button } from "@/components/ui/button";
import { api } from "@/convex/_generated/api";
import { SignInButton, SignOutButton, SignedIn, SignedOut, useOrganization, useSession, useUser } from "@clerk/nextjs";
import { useMutation, useQuery } from "convex/react";


export default function Home() { 
  const createFile = useMutation(api.files.createFile);
  const org= useOrganization();
  const user = useUser();
  
  let orgId :string |undefined;
  if(org.isLoaded && user.isLoaded){
    orgId=org.organization?.id??user.user?.id;
  }
  
  const files =  useQuery(api.files.getFiles, orgId?{orgId}:"skip");
  return (
    <main className="flex min-h-screen flex-col items-cen ter justify-between p-24">
      
      
      
      <Button>hello</Button>
      <Button onClick={()=>{if(!orgId)return;
        createFile({name:"hello world", orgId});}}>hello world</Button>
      {files?.map(file=>{
        return <div key={file._id}>{file.name}</div>;
      })} 
    </main>
  );
}
