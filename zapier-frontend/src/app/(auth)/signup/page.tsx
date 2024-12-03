"use client";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Load from "@/app/components/Load";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import axios from "axios";

export default function Signup() {
  const [firstName, setFirstName] = useState<string>();
  const [lastName, setLastName] = useState<string>();
  const [image, setImage] = useState<File | null>();
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();

  const navigate = useRouter();
  const { toast } = useToast();

  const handelSignUp = async () => {
    if (!firstName || !lastName || !email || !password) {
      toast({
        title: "empty slots",
        description: "please fill all the slots for signup",
      });
      return;
    }

    try {
      const res = await axios.post(``, {
        firstName: firstName,
        lastName: lastName,
        imageUrl: "",
        email: email,
        password: password,
      });

      toast({
        title: "signup successfully",
        description: `welcome ${firstName} ${lastName} to the _automater`,
      });

      const token = "Bearer " + res.data.token;
      localStorage.setItem("token", token);

      navigate.replace("/dashboard");
    } catch (error) {
      console.log("error while sending data to backend!");
      toast({
        title: "signup failed!",
        description: "there is some error in backend side",
      });
    }
  };

  console.log("why!!", process.env.ZAP_ENVIRONEMNT);
  return (
    <div className="h-full w-full p-24 flex items-center gap-12 justify-between">
      <div className="w-1/2 h-full flex flex-col items-center justify-center text-white">
        <button
          className="px-4 py-2 text-sm rounded-full bg-orange-700 w-fit"
          onClick={() => navigate.push("/")}
        >
          <i>Homepage</i>
        </button>
        <h1 className="text-4xl">What will you automate today?</h1>
        <p className="text-2xl">
          {" "}
          - automation is key to achieve more and something new
        </p>
        <div className="mt-10">
          <Load />
        </div>
      </div>
      <div className="w-1/2 p-8 rounded-xl flex flex-col">
        <div className="w-5/6 border border-gray-500 p-8 rounded-xl flex flex-col gap-2 shadow-lg shadow-orange-700/50 hover:shadow-orange-700/100">
          <div className="flex gap-2 w-full">
            <div className="items-center gap-1.5 w-1/2">
              <Label htmlFor="FirstName">FirstName</Label>
              <Input
                type="FirstName"
                id="FirstName"
                placeholder="FirstName"
                onChange={(e) => setFirstName(e.target.value)}
                value={firstName}
              />
            </div>
            <div className="grid items-center gap-1.5 w-1/2">
              <Label htmlFor="LastName">LastName</Label>
              <Input
                type="LastName"
                id="LastName"
                placeholder="LastName"
                onChange={(e) => setLastName(e.target.value)}
                value={lastName}
              />
            </div>
          </div>
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="picture">Picture</Label>
            <Input
              id="picture"
              type="file"
              onChange={(e) => setImage(e.target.files?.[0])}
            />
          </div>
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="Email">Email</Label>
            <Input
              type="Email"
              id="Email"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
          </div>
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="Password">Password</Label>
            <Input
              type="Password"
              id="Password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
          </div>
          <button
            className="px-4 py-2 text-sm rounded-full bg-orange-700"
            onClick={handelSignUp}
          >
            signup
          </button>
        </div>
      </div>
    </div>
  );
}
