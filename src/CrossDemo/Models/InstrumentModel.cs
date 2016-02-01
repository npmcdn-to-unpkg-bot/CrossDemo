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
    }
}
