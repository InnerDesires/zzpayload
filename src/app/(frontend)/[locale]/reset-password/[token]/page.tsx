import ResetPasswordForm from './reset-password-form';



export default async function ResetPasswordPage({ params }: { params: Promise<{ token: string }> }) {
    const token = (await params).token;
    return <ResetPasswordForm token={token} />
} 