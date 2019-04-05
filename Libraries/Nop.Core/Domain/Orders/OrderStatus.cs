namespace Nop.Core.Domain.Orders
{
    /// <summary>
    /// Represents an order status enumeration
    /// </summary>
    public enum OrderStatus
    {
        /// <summary>
        /// Pending
        /// </summary>
        Pending = 10,
        Processing = 20,
        Preparing = 30,
        Prepared = 40,
        Delivering = 50,
        Delivered = 60,
        /// <summary>
        /// Processing
        /// </summary>


        /// <summary>
        /// Complete
        /// </summary>
        Complete = 70,

        /// <summary>
        /// Cancelled
        /// </summary>
        Cancelled = 80
    }
}
