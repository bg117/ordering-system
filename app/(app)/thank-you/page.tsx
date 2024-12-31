import { Button } from "react-bootstrap";

export default function ThankYou() {
  return (
    <main className="container d-flex flex-column justify-content-center align-items-center">
      <h1>Thank You!</h1>
      <p>Your order has been placed.</p>
      <Button variant="primary" href="/">
        Return to Home
      </Button>
    </main>
  );
}
