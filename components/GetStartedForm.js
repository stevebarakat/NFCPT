import Button from "./Button";

export default function GetStartedForm() {
  return (
    <>
      <form
        name="contact"
        action="/contact-thanks"
        method="POST"
        data-netlify="true"
      >
        <input type="hidden" name="form-name" value="contact" />
        <div className="inputWrap">
          <label htmlFor="name">Name:</label> <br />
          <input type="text" name="name" id="name" required />
        </div>
        <div className="inputWrap">
          <label htmlFor="email">Email:</label> <br />
          <input type="email" name="email" id="email" required />
        </div>
        <div className="inputWrap">
          <label htmlFor="phoneNumber">Phone Number:</label> <br />
          <input type="tel" name="phoneNumber" id="phoneNumber" required />
        </div>
        <div className="inputWrap">
          <label htmlFor="message">Message:</label> <br />
          <textarea name="message" id="message" rows="5" required></textarea>
        </div>
        <div style={{ float: "right" }}>
          <Button
            type="submit"
            color="var(--darkColor)"
            textColor="var(--grey05)"
          >
            Send
          </Button>
        </div>
      </form>
      <style jsx>{`
        .inputWrap {
          padding-bottom: 2rem;
        }
        .inputWrap label {
          display: inline-block;
          padding-bottom: 16px;
        }
        .inputWrap input,
        .inputWrap textarea {
          background: var(--papayaWhip25);
        }
        @media (min-width: 850px) {
        }
      `}</style>
    </>
  );
}
