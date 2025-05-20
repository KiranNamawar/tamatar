import {
	Html,
	Head,
	Preview,
	Body,
	Container,
	Section,
	Text,
	Tailwind,
} from "@react-email/components";

interface OtpVerificationEmailProps {
	otpCode: string;
	userName?: string;
}

export default function OtpVerificationEmail({
	otpCode,
	userName,
}: OtpVerificationEmailProps) {
	return (
		<Html>
			<Head />
			<Preview>Your OTP Code for Verification</Preview>
			<Tailwind>
				<Body className="bg-gray-50 font-sans">
					<Container className="mx-auto my-8 p-6 bg-white rounded shadow-md max-w-md">
						<Section>
							<Text className="text-xl font-bold text-gray-800 mb-2">
								{userName ? `Hello, ${userName}!` : "Hello!"}
							</Text>
							<Text className="text-gray-700 mb-4">
								Use the following One-Time Password (OTP) to verify your
								account:
							</Text>
							<Section className="flex justify-center my-6">
								<Text className="text-3xl tracking-widest font-mono font-semibold text-blue-600 bg-blue-50 px-6 py-3 rounded">
									{otpCode}
								</Text>
							</Section>
							<Text className="text-gray-600 text-sm mb-2">
								This OTP is valid for 10 minutes. Please do not share it with
								anyone.
							</Text>
							<Text className="text-gray-400 text-xs mt-6">
								If you did not request this, you can safely ignore this email.
							</Text>
						</Section>
					</Container>
				</Body>
			</Tailwind>
		</Html>
	);
}
