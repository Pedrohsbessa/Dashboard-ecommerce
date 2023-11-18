import { SignUp } from '@clerk/nextjs';
import { dark } from '@clerk/themes';

export default function Page() {
   return (
      <div className="h-screen w-screen flex justify-center items-center bg-black">
         <SignUp appearance={{ baseTheme: dark }} />
      </div>
   );
}
