AEDC Subscription Management Tracker

Overview
![Screenshot (103)](https://github.com/user-attachments/assets/81076912-8d4f-4b39-afc2-f1a017fe7c3e)
The Login Page

![Screenshot (78)](https://github.com/user-attachments/assets/c58f70e7-2955-4e59-8c07-a2333befd05d)
The Subscription Form

The AEDC Subscription Management Tracker is a web-based platform designed to manage and monitor company-wide subscriptions such as dedicated internet service plans, domain name renewals, and other critical service contracts. The application streamlines subscription management by providing real-time tracking from the start date of a subscription until its expiration. It also automates email notifications to alert stakeholders as renewal deadlines approach.

Key Features
Subscription Tracking:

Each subscription entry includes details such as the start date, expiration date, type of service (e.g., Internet, Domain, etc.), and the stakeholder emails(Frrrom a ddrop down selection from the server).
Subscriptions are displayed on a central dashboard for an at-a-glance view of their status.

Automated Notification System:

Email Alerts: The system sends reminder emails to relevant stakeholders at predefined intervals based on the remaining time before the subscription expires:
Below 6 months: Monthly reminders.
3 months remaining: Every 2 weeks.
1 month remaining: Weekly reminders.
2 weeks remaining: Daily reminders.
Status Color-Coding:

Active subscriptions are displayed with a green label to indicate they are up to date.
Expired subscriptions are marked in red, indicating immediate action is required.


Dashboard Interface:

All subscriptions are presented on a user-friendly dashboard, providing a clear visual indicator of their current status. Users can filter or search for specific subscriptions.
Mail Service Integration:

The system integrates with a mail service to handle the automatic dispatch of reminder emails, ensuring that stakeholders are promptly notified of upcoming expirations.
Project Goals

Efficiency: By automating email reminders and centralizing subscription data, the system aims to minimize the risk of missed renewals.

Scalability: The platform is designed to handle multiple subscriptions across various services, making it suitable for both small businesses and large enterprises.

User Experience: A clean, intuitive interface allows users to quickly check the status of subscriptions and take action if needed.


Technology Stack

As the Frontend Developer, I was responsible for implementing the following technologies:

Front-end: HTML, CSS, JavaScript (React + Vite.js)

Responsive Design: Ensured that the dashboard and other interface components are fully responsive across devices.

API Integration: implementing information from the API endoints on the Front-end.



Back-end and other integrations (handled by other team members, included for project completeness):

Back-end: Flask (Python-based web framework)

Database: MySQL (used to store subscription data)

Mail Service: Integrated with a service like SendGrid, Mailgun, or an SMTP server for email notifications
Usage

Add Subscription: Authorized Users can log in and add a new subscription, providing details such as the service name, stakeholder emails, Service description, start date, and expiration date.

Email Notification: Once a subscription is entered, the system begins sending notifications based on the time remaining until expiration.

Visual Monitoring: The dashboard provides a color-coded system where users can monitor the status of all active and expired subscriptions at a glance.
Future Enhancements

Multi-user Support: Enable role-based access control for multiple users across the organization.

SMS Notifications: In addition to emails, integrate SMS reminders for urgent subscription renewals.

Analytics: Provide insights into subscription trends, costs, and renewal patterns through data visualization.
