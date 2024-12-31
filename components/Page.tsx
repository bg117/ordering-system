import { Container } from "react-bootstrap";
import Header from "./Header";

type PageProps = Readonly<{
  children: React.ReactNode;
}>;

export default function Page({ children }: PageProps) {
  return (
    <div>
      <Header />
      <Container className="py-4">{children}</Container>
    </div>
  );
}
