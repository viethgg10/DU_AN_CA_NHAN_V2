"use client";
import { useState } from 'react';

import {
  Typography,
  Card,
  CardBody,
  Radio,
  Input,
  Textarea,
  Button,
  IconButton,
} from "@material-tailwind/react";
import { EnvelopeIcon, PhoneIcon, TicketIcon } from "@heroicons/react/24/solid";

const CONTACT_INFO = {
  phone: "0327719434",
  email: "anhviet27709@mail.com"
};

const SOCIAL_LINKS = [
  { icon: "fa-facebook", href: "#" },
  { icon: "fa-instagram", href: "#" },
  { icon: "fa-github", href: "#" }
];

export function ContactForm() {


  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    type: "Design",
    message: ""
  })
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus('Message sent successfully!');
        setFormData({ firstName: '', lastName: '', email: '', type: 'Design', message: '' });
      } else {
        setStatus('Failed to send message');
      }
    } catch (error) {
      setStatus('Error occurred');
    } finally {
      setIsLoading(false);
    }
  };



  return (
    <section className="px-8 py-16 bg-black">
      <div className="container mx-auto mb-20 text-center">
        <Typography variant="h1" color="white" className="mb-4">
          Contact Us
        </Typography>
        <Typography
          variant="lead"
          className="mx-auto w-full lg:w-5/12 !text-gray-500"
        >
          Have questions or movie suggestions? We'd love to hear from you! Reach
          out through our contact form and let's make your viewing experience even better.
        </Typography>
      </div>
      <div>
        <Card shadow={true} className="container mx-auto border border-gray/50">
          <CardBody className="grid grid-cols-1 lg:grid-cols-7 md:gap-10">
            <div className="w-full col-span-3 rounded-lg h-full py-8 p-5 md:p-16 bg-gray-900">
              <Typography variant="h4" color="white" className="mb-2">
                Contact Information
              </Typography>
              <Typography
                variant="lead"
                className="mx-auto mb-8 text-base !text-gray-500"
              >
                Fill up the form and our Team will get back to you within 24
                hours.
              </Typography>
              <div className="flex gap-5">
                <PhoneIcon className="h-6 w-6 text-white" />
                <Typography variant="h6" color="white" className="mb-2">
                  {CONTACT_INFO.phone}
                </Typography>
              </div>
              <div className="flex my-2 gap-5">
                <EnvelopeIcon className="h-6 w-6 text-white" />
                <Typography variant="h6" color="white" className="mb-2">
                  {CONTACT_INFO.email}
                </Typography>
              </div>
              <div className="flex mb-10 gap-5">
                <TicketIcon className="h-6 w-6 text-white" />
                <Typography variant="h6" color="white" className="mb-2">
                  Open Support Ticket
                </Typography>
              </div>
              <div className="flex items-center gap-5">
                {SOCIAL_LINKS.map((social, index) => (
                  <IconButton key={index} variant="text" color="white">
                    <i className={`fa-brands ${social.icon} text-lg`} />
                  </IconButton>
                ))}
              </div>
            </div>
            <div className="w-full mt-8 md:mt-0 md:px-10 col-span-4 h-full p-5">
              <form onSubmit={handleSubmit}>
                <div className="mb-8 grid gap-4 lg:grid-cols-2">

                  <Input
                    color="gray"
                    size="lg"
                    variant="static"
                    label="First Name"
                    name="firstName"
                    value={formData.firstName}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    placeholder="eg. Lucas"
                    containerProps={{
                      className: "!min-w-full mb-3 md:mb-0",
                    }}
                  />

                  <Input
                    color="gray"
                    size="lg"
                    variant="static"
                    label="Last Name"
                    name="lastName"
                    value={formData.lastName}
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                    placeholder="eg. Jones"
                    containerProps={{
                      className: "!min-w-full",
                    }}
                  />
                </div>

                <Input
                  color="gray"
                  size="lg"
                  variant="static"
                  label="Email"
                  name="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="eg. lucas@mail.com"
                  containerProps={{
                    className: "!min-w-full mb-8",
                  }}
                />
                <Typography
                  variant="lead"
                  className="!text-blue-gray-500 text-sm mb-2"
                >
                  What are you interested on?
                </Typography>
                <div className="-ml-3 mb-14 ">

                  <Radio
                    color="gray"
                    name="type"
                    label="Design"
                    value="Design"
                    checked={formData.type === "Design"}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                  />
                  <Radio
                    color="gray"
                    name="type"
                    label="Development"
                    value="Development"
                    checked={formData.type === "Development"}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                  />
                  <Radio
                    color="gray"
                    name="type"
                    label="Support"
                    value="Support"
                    checked={formData.type === "Support"}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                  />
                  <Radio
                    color="gray"
                    name="type"
                    label="Other"
                    value="Other"
                    checked={formData.type === "Other"}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                  />
                </div>

                <Textarea
                  color="gray"
                  size="lg"
                  variant="static"
                  label="Your Message"
                  name="message"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  containerProps={{
                    className: "!min-w-full mb-8",
                  }}
                />
                <div className="w-full flex justify-end">
                  <Button
                    type="submit"
                    className="w-full md:w-fit"
                    color="gray"
                    size="md"
                    disabled={isLoading}
                  >
                    {isLoading ? 'Sending...' : 'Send message'}
                  </Button>
                </div>
                {status && (
                  <div className="mt-4 text-center">
                    <Typography
                      variant="small"
                      color={status.includes('successfully') ? 'green' : 'red'}
                    >
                      {status}
                    </Typography>
                  </div>
                )}
              </form>
            </div>
          </CardBody>
        </Card>
      </div>
    </section>
  );
}

export default ContactForm;
