using MimeKit;
using MailKit.Net.Smtp;

namespace UserMicroservice.Services.MailService
{
    public class Message
    {
        public MailboxAddress To { get; set; }
        public string Subject { get; set; }
        public string Content { get; set; }

        public Message(string to, string subject, string content)
        {
            To = new MailboxAddress("Validation link", to);
            Subject = subject;
            Content = content;
        }
    }
}
