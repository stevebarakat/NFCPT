import Button from "./Button";

export default function ClaimOfferForm() {
  return (
    <>
      <form
        name="claim-offer"
        action="/claim-offer-thanks"
        method="POST"
        data-netlify="true"
      >
        <input type="hidden" name="form-name" value="claim-offer" />
        <div className="inputWrap">
          <label htmlFor="name">Name:</label> <br />
          <input type="text" name="name" id="name" required />
        </div>
        <div className="inputWrap">
          <label htmlFor="phoneNumber">Phone Number:</label> <br />
          <input type="tel" name="phoneNumber" id="phoneNumber" required />
        </div>
        <div className="inputWrap">
          <label htmlFor="email">Email:</label> <br />
          <input type="email" name="email" id="email" required />
        </div>
        <div className="inputWrap">
          <Button
            color="var(--accentColor)"
            borderColor="white"
            textColor="white"
            width="100%"
          >
            Claim This Offer Now
          </Button>
        </div>
      </form>
      <style jsx>{`
        .inputWrap {
          padding-bottom: 1rem;
        }
        @media (min-width: 850px) {
        }
      `}</style>
    </>
  );
}
