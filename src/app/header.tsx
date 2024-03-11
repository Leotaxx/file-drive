import { Button } from "@/components/ui/button";
import { OrganizationSwitcher, SignInButton, SignOutButton, SignedIn, SignedOut, UserButton ,UserProfile} from "@clerk/nextjs";

export function Header(){
    return(
        <div className="border-b py-4 bg-gray-50">
            <div className="items-center container mx-auto justify-between flex">
                <div className="logo">FileDrive</div>
                <div className="flex gap-2">
                <SignedOut>
                <SignInButton mode="modal">        
                <Button>Sign In</Button>
                </SignInButton>
                </SignedOut>  
                <SignedIn>
                <SignOutButton>
                <Button>Sign Out</Button> 
                </SignOutButton>
                </SignedIn>
                <OrganizationSwitcher /> 
                <UserButton />  

                </div>
                
            </div>
        </div>
    )
}