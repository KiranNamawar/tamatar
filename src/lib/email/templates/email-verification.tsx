import { Text, Body, Container, Head, Heading, Html, Preview, Section, Tailwind, Button } from '@react-email/components';

export default function EmailVerificationTemplate(
    name: string,
    otp: string,
) {
    return (
        <Html>
            <Head />
            <Preview>Verify your email address</Preview>
            <Tailwind>
                <Body className="bg-[#000000] py-[40px] font-sans">
                    <Container className="mx-auto max-w-[465px] rounded-[8px] bg-gray-900 p-[20px]">
                        <Section className="mt-[32px]">
                            <Heading className="m-0 text-center text-[24px] font-bold text-[#fff]">
                                Verify Your Email Address
                            </Heading>
                        </Section>
                        <Section className="mt-[24px]">
                            <Text className="text-[16px] leading-[24px] text-[#bbb]">
                                Thank you for signing up {name}! To complete your
                                registration, please use the verification code
                                below:
                            </Text>
                        </Section>
                        <Section className="my-[32px] text-center">
                            <Text className="m-0 inline-block rounded-[8px] bg-[#ccb4f4] px-[32px] py-[16px] text-[32px] font-bold tracking-[5px]">
                                {otp}
                            </Text>
                        </Section>
                        <Section>
                            <Text className="text-[16px] leading-[24px] text-[#aaa]">
                                This code will expire in 10 minutes. If you
                                didn&apos;t request this code, please ignore
                                this email.
                            </Text>
                        </Section>
                        <Section className="border-t border-solid border-[#ddd] pt-[32px]">
                            <Text className="text-[14px] leading-[24px] text-[#ccc]">
                                If you have any questions, please contact our
                                support team at{' '}
                                <a
                                    href="mailto:support@tamatar.store"
                                    className="text-[#0070f3]"
                                >
                                    support@tamatar.store
                                </a>
                            </Text>
                        </Section>
                    </Container>
                    <Container className="mx-auto mt-[32px] max-w-[465px] text-center">
                        <Text className="m-0 text-[12px] text-[#8898aa]">
                            © {new Date().getFullYear()} Tamatar Store. All
                            rights reserved.
                        </Text>
                        <Text className="m-0 text-[12px] text-[#8898aa]">
                            <a
                                href="https://tamatar.store/unsubscribe"
                                className="text-[#8898aa]"
                            >
                                Unsubscribe
                            </a>
                        </Text>
                    </Container>
                </Body>
            </Tailwind>
        </Html>
    );
}
