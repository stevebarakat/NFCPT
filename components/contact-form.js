import Button from "./Button";
import { useForm, ValidationError } from "@formspree/react";
export default function ContactForm() {
  const [state, handleSubmit] = useForm(process.env.NEXT_PUBLIC_CONTACT_FORM);
  if (state.succeeded) {
    return (
      <>
        <h1>Thank You</h1>
        <p>
          Your form was successfully submitted. Someone from our office will be
          responding to you shortly. If you don&apos;t hear back from us within
          the next 24 hours, please check your junk mail to ensure we
          weren&apos;t flagged by the spam filter.
        </p>
      </>
    );
  }
  return (
    <form onSubmit={handleSubmit}>
      <div className="inputWrap">
        <label htmlFor="name">Name</label>
        <input id="name" type="text" name="name" required />
        <ValidationError prefix="Name" field="name" errors={state.errors} />
      </div>
      <div className="inputWrap">
        <label htmlFor="email">Email Address</label>
        <input id="email" type="email" name="email" required />
        <ValidationError prefix="Email" field="email" errors={state.errors} />
      </div>
      <div className="inputWrap">
        <label htmlFor="phoneNumber">Phone Number</label>
        <input id="phoneNumber" type="tel" name="phoneNumber" required />
        <ValidationError
          prefix="Email"
          field="phoneNumber"
          errors={state.errors}
        />
      </div>
      <div className="inputWrap">
        <label htmlFor="message">Message</label>
        <textarea id="message" name="message" rows="5" required />
        <ValidationError
          prefix="Message"
          field="message"
          errors={state.errors}
        />
      </div>
      <Button
        type="submit"
        color="var(--darkColor)"
        textColor="var(--grey05)"
        disabled={state.submitting}
      >
        Submit
      </Button>
    </form>
  );
}
