import { Checkbox, Input, InputPassword, Textarea } from "@/components/ui";
import ComponentPreview from "../preview/ComponentPreview";

const FormsPanel = () => {
  return (
    <>
      <div className="dev-page-header">
        <div className="dev-page-eyebrow">Design system</div>
        <h1 className="dev-page-title">Form controls</h1>
        <p className="dev-page-lede">
          Every type <code>InputFactory</code> supports today — native elements
          throughout, wired for <code>react-hook-form</code>'s{" "}
          <code>register()</code> with no <code>Controller</code> needed.
        </p>
      </div>

      <section className="dev-section">
        <ComponentPreview name="Input" tag='<Input type="email" />' column>
          <Input
            id="ds-email"
            label="Email"
            type="email"
            placeholder="you@example.com"
          />
        </ComponentPreview>

        <ComponentPreview
          name="Input — error state"
          tag="<Input error={...} />"
          column
        >
          <Input
            id="ds-email-error"
            label="Email"
            type="email"
            placeholder="you@example.com"
            error="Enter a valid email address"
          />
        </ComponentPreview>

        <ComponentPreview name="Password" tag="<PasswordInput />" column>
          <InputPassword
            id="ds-password"
            label="Password"
            placeholder="Enter your password"
          />
        </ComponentPreview>

        <ComponentPreview name="Textarea" tag="<Textarea />" column>
          <Textarea
            id="ds-message"
            label="Message"
            placeholder="Write your message..."
          />
        </ComponentPreview>

        <ComponentPreview name="Checkbox" tag="<Checkbox />" column>
          <Checkbox id="ds-newsletter" label="Subscribe to the newsletter" />
        </ComponentPreview>
      </section>
    </>
  );
};

export default FormsPanel;
