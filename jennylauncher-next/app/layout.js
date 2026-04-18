export const metadata = {
  title: "JennyLauncher by foidstudios",
  description: "Custom Windows game launcher with integrated store browser."
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
