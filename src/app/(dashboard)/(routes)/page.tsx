import { UserButton } from "@clerk/nextjs";

export default function Home() {
  return (
    <div>
      <p className="text-4xl text-red-400">This is protected</p>
      <UserButton afterSignOutUrl="/" />
    </div>
  );
}
