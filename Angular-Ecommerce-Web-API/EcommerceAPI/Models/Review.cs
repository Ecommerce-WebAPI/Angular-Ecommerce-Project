﻿// <auto-generated> This file has been auto generated by EF Core Power Tools. </auto-generated>
#nullable disable
using System;
using System.Collections.Generic;

namespace EcommerceAPI.Models;

public partial class Review
{
    public int Id { get; set; }

    public decimal Rating { get; set; }

    public string Comment { get; set; }

    public DateTime Timestamp { get; set; }

    public int ProductId { get; set; }

    public string UserId { get; set; }

    public virtual Product Product { get; set; }

    public virtual ApplicationUser User { get; set; }
}