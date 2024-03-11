"use client"
import { Button } from "@/components/ui/button";
import { api } from "@/convex/_generated/api";
import { SignInButton, SignOutButton, SignedIn, SignedOut, useOrganization, useSession } from "@clerk/nextjs";
import { useMutation, useQuery } from "convex/react";


export default function Home() {
  const files =  useQuery(api.files.getFiles);
  
  const createFile = useMutation(api.files.createFile);
  const {organization} = useOrganization();
  console.log(organization?.id);
  return (
    <main className="flex min-h-screen flex-col items-cen ter justify-between p-24">
      <SignedIn>
        <SignOutButton>
          <Button>Sign Out</Button> 
        </SignOutButton>
      </SignedIn>
      <SignedOut>
      <SignInButton mode="modal">
        
        <Button>Sign In</Button>
      </SignInButton>
      </SignedOut>
      
      <Button>hello</Button>
      <Button onClick={()=>{createFile({name:"hello world",});}}>hello world</Button>
      {files?.map(file=>{
        return <div key={file._id}>{file.name}</div>;
      })} 
    </main>
  );
}
