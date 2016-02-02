using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CrossDemo
{
    public class InstrumentModel
    {
        public int Id { get; set; }
        public string Model { get; set; }
        public string SerialNumber { get; set; }
        public string Manufacturer { get; set; }
        public string FirmwareVersion { get; set; }
        public string Type { get; set; }
        public string ImageUrl { get; set; }
        public IEnumerable<AddressModel> Addresses { get; set; }
        public Driver Drivers { get; set; }
    }

    public class AddressModel
    {
        public string Address { get; set; }
        public int Status { get; set; }
    }
    public class Driver
    {
        public bool CanUpdate { get; set; }
        public IEnumerable<string> Versions { get; set; }
    }
}
