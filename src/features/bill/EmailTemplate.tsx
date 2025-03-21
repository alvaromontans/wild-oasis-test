interface EmailTemplateProps {
  firstName: string;
}

export function EmailTemplate({ firstName }: Readonly<EmailTemplateProps>) {
  return (
    <div>
      <h1>Welcome, {firstName}!</h1>
    </div>
  );
}
