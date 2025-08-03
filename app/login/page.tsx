import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { unstable_noStore } from "next/cache";

export default function LoginPage() {
  unstable_noStore();

  async function login(formData: FormData) {
    "use server";

    const identifier = formData.get("identifier") as string; // email or username
    const password = formData.get("password") as string;

    const user = await prisma.user.findFirst({
      where: {
        OR: [
          { email: identifier },
          { name: identifier }
        ]
      }
    });

    if (!user) return redirect("/login?error=Invalid Credentials");

    if (password !== user.password) return redirect("/login?error=Invalid Credentials");

    (await cookies()).set("auth", String(user.id), { httpOnly: true, maxAge: 60 * 60 * 24 * 7 });
    redirect("/");
  }

  return (
    <div className="flex items-center justify-center">
      <Card className="w-[400px]">
        <form action={login}>
          <CardHeader>
            <CardTitle>Login</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 my-4">
            <Input name="identifier" placeholder="Email or Username" />
            <Input name="password" type="password" placeholder="Password" />
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full bg-[#1e9ffe] text-white hover:bg-[#1e9ffe]/50">Login</Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
