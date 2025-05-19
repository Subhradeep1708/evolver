"use client";

import React from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

const Contact = () => {
  return (
    <div className="w-full flex flex-col md:flex-row py-32 px-4 md:px-12 gap-12">
      {/* Left Side - Form */}
      <div className="md:basis-1/2 flex flex-col items-start space-y-6">
        <h2 className="text-3xl font-bold text-[#102353]">Contact Us</h2>
        <p className="text-sm max-w-xl leading-relaxed">
          Have a question, feedback, or need support? We're here to help! Reach
          out to us by filling out the form below, or use the contact details
          provided.
        </p>
        <form className="w-full space-y-4 max-w-xl">
          <div className="space-y-1">
            <Label htmlFor="name">Name</Label>
            <Input id="name" placeholder="John Doe" />
          </div>
          <div className="space-y-1">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="abc@gmail.com" />
          </div>
          <div className="space-y-1">
            <Label htmlFor="message">Message</Label>
            <Textarea id="message" placeholder="Type your message here" rows={4} />
          </div>
          <Button type="submit" className="w-full md:w-[600px]">
            Send Message
          </Button>
        </form>
      </div>

      {/* Right Side - Contact Info */}
      <div className="md:basis-1/2 flex flex-col justify-start space-y-4 text-base">
        <div>
          <p className="font-semibold">
            Email:{" "}
            <span className="font-normal">support@examportal.com</span>
          </p>
          <p className="font-semibold">
            Phone: <span className="font-normal">+1 (123) 456-7890</span>
          </p>
          <p className="font-semibold">
            Address:{" "}
            <span className="font-normal">
              123 Exam Portal Lane, Suite 100, Exam City, EX 45678
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Contact;
