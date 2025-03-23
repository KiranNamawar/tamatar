import {
    Body,
    Column,
    Container,
    Head,
    Hr,
    Html,
    Img,
    Link,
    Preview,
    Row,
    Section,
    Tailwind,
    Text,
} from '@react-email/components';
import {
    IconNotes,
    IconSettings,
    IconUnlink,
    IconUser,
} from '@tabler/icons-react';
import React from 'react';

interface WelcomeEmailTemplateProps {
    name: string;
}

const domain = 'https://tamatar.store';

export const WelcomeEmailTemplate: React.FC<
    Readonly<WelcomeEmailTemplateProps>
> = ({ name }) => (
    <Html lang="en" dir="ltr">
        <Head>
            <title>Welcome to Tamatar Store</title>
        </Head>
        <Tailwind>
            <Body className="m-auto bg-gray-900 p-4 text-white">
                <Preview>
                    Welcome to Tamatar Store {name}, we are excited to have you
                    on board.
                </Preview>
                <Container className="m-auto rounded-2xl bg-gray-800 p-4">
                    <Text className="m-2 text-2xl">
                        Welcome to Tamatar Store, {name}! 🎉
                    </Text>
                    <Text className="m-2">Here's what you can do next:</Text>
                    <Section className="m-2">
                        <Row>
                            <Text className="text-lg">
                                Explore Tamatar Stores Products:
                            </Text>
                        </Row>
                        <Row>
                            <Column className="">
                                <Img src={`${domain}/link.png`} alt="Link" />
                                <Link
                                    href={`${domain}/url-shortener`}
                                    className="text-yellow-400"
                                >
                                    URL Shortner
                                </Link>
                            </Column>
                            <Column className="">
                                <Img src={`${domain}/notes.png`} alt="Notes" />
                                <Link
                                    href={`${domain}/notes`}
                                    className="text-yellow-400"
                                >
                                    Notes
                                </Link>
                            </Column>
                        </Row>
                        <Row>
                            <Text className="text-lg">Setup your account:</Text>
                        </Row>
                        <Row>
                            <Column className="">
                                <Img src={`${domain}/user.png`} alt="User" />
                                <Link
                                    href={`${domain}/profile`}
                                    className="text-yellow-400"
                                >
                                    Profile
                                </Link>
                            </Column>
                            <Column className="">
                                <Img src={`${domain}/settings.png`} alt="Settings" />
                                <Link
                                    href={`${domain}/settings`}
                                    className="text-yellow-400"
                                >
                                    Settings
                                </Link>
                            </Column>
                        </Row>
                    </Section>
                    <Hr />
                    <Text className="m-2">
                        If you have any questions, feel free to reach out to us
                        at{' '}
                        <Link
                            href="mailto:support@tamatar.store"
                            className="text-green-500"
                        >
                            support@tamatar.store
                        </Link>
                    </Text>
                </Container>
            </Body>
        </Tailwind>
    </Html>
);
