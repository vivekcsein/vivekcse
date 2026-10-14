import type { Metadata } from "next";
import Link from "next/link";
import ContactForm from "@/components/features/contact/ContactForm";
import PageHero from "@/components/layouts/PageHero";
import { Icon, type IconName } from "@/components/ui";
import appConfig from "@/packages/configs/app.config";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch — open to freelance projects and full-time roles.",
};

const contactMethods = [
  {
    label: "Email",
    value: appConfig.author.email,
    href: `mailto:${appConfig.author.email}`,
    icon: "mail",
  },
  {
    label: "GitHub",
    value: `@${appConfig.social.github.name}`,
    href: appConfig.social.github.handle,
    icon: "github",
  },
  {
    label: "LinkedIn",
    value: "LinkedIn Profile",
    href: appConfig.social.linkedin.handle,
    icon: "linkedin",
  },
  {
    label: "Twitter",
    value: `@${appConfig.social.twitter.name}`,
    href: appConfig.social.twitter.handle,
    icon: "twitter",
  },
];

const ContactPage = () => {
  return (
    <PageHero
      badge="Contact"
      title="Let's Build Something"
      description="Open to freelance projects, full-time roles, and interesting collaborations. The fastest way to reach me is email."
    >
      <div className="mx-auto grid max-w-4xl grid-cols-1 gap-10 pt-4 md:grid-cols-2">
        <ContactForm />

        <div className="flex flex-col gap-3">
          {contactMethods.map((method) => (
            <Link
              key={method.label}
              href={method.href}
              target={method.href ? "_blank" : undefined}
              rel={method.href ? "noreferrer" : undefined}
              className="flex items-center gap-3 rounded-2xl border border-border bg-card/50 p-4 transition-colors hover:border-primary/40"
            >
              <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Icon name={method.icon as IconName} className="size-4" />
              </div>
              <div className="min-w-0">
                <p className="text-xs text-muted-foreground">{method.label}</p>
                <p className="truncate text-sm font-medium">{method.value}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </PageHero>
  );
};

export default ContactPage;
