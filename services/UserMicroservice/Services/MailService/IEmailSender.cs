namespace UserMicroservice.Services.MailService
{
    public interface IEmailSender
    {
        void SendEmail(Message message);
    }
}
