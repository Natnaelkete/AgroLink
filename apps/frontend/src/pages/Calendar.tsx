import { useState, useEffect } from "react";
import { toEthiopian, toGregorian } from "ethiopian-calendar-new";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  ChevronLeft, 
  ChevronRight, 
  Clock,
  Calendar as CalendarIcon,
  Sun,
  Moon,
  Star,
  Flag,
  Cross,
  Coffee,
  Gift
} from "lucide-react";

const monthsAmharic = [
  "መስከረም", "ጥቅምት", "ህዳር", "ታህሳስ", "ጥር", "የካቲት", 
  "መጋቢት", "ሚያዝያ", "ግንቦት", "ሰኔ", "ሐምሌ", "ነሐሴ", "ጳጉሜ",
];

const daysAmharic = ["እሁድ", "ሰኞ", "ማክሰኞ", "ረቡዕ", "ሐሙስ", "አርብ", "ቅዳሜ"];

const ethiopianPublicHolidays = [
  { month: 1, day: 1, name: "እንቁጣጣሽ (Ethiopian New Year)", icon: "🎆" },
  { month: 1, day: 17, name: "መስቀል (Finding of the True Cross)", icon: "✝️" },
  { month: 3, day: 10, name: "የኢድ አል ፈጥር በዓል (Eid al-Fitr)", icon: "🌙" },
  { month: 3, day: 17, name: "የኢድ አል አድሃ በዓል (Eid al-Adha)", icon: "🕌" },
  { month: 4, day: 7, name: "የገና በዓል (Christmas)", icon: "🎄" },
  { month: 5, day: 11, name: "ጥምቀት (Epiphany)", icon: "💧" },
  { month: 7, day: 2, name: "የአድዋ ድል ቀን (Adwa Victory Day)", icon: "⚔️" },
  { month: 7, day: 20, name: "የፋሲካ በዓል (Ethiopian Easter)", icon: "🐣" },
  { month: 9, day: 1, name: "የሰራተኞች ቀን (Labour Day)", icon: "👷" },
  { month: 9, day: 12, name: "የወራት መጀመሪያ (Ethiopian Patriots' Victory Day)", icon: "🎖️" },
  { month: 10, day: 6, name: "የኢትዮጵያ አብዮት ቀን (Ethiopian Revolution Day)", icon: "🔔" },
];

const Calendar = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [currentEthDate, setCurrentEthDate] = useState({
    day: 0,
    month: 0,
    year: 0,
  });
  const [displayMonth, setDisplayMonth] = useState(0);
  const [displayYear, setDisplayYear] = useState(0);

  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();
      setCurrentTime(now);
      const eth = toEthiopian(
        now.getFullYear(),
        now.getMonth() + 1,
        now.getDate()
      );
      setCurrentEthDate(eth);

      if (!displayMonth) {
        setDisplayMonth(eth.month);
        setDisplayYear(eth.year);
      }
    };

    const timerId = setInterval(updateDateTime, 1000);
    updateDateTime();

    return () => clearInterval(timerId);
  }, [displayMonth]);

  const getDaysInEthMonth = (year: number, month: number) =>
    month === 13 ? (year % 4 === 3 ? 6 : 5) : 30;

  const changeMonth = (direction: number) => {
    let newMonth = displayMonth + direction;
    let newYear = displayYear;

    if (newMonth > 13) {
      newMonth = 1;
      newYear += 1;
    } else if (newMonth < 1) {
      newMonth = 13;
      newYear -= 1;
    }

    setDisplayMonth(newMonth);
    setDisplayYear(newYear);
  };

  const renderMonthDays = () => {
    const days = [];
    const totalDays = getDaysInEthMonth(displayYear, displayMonth);

    // Calculate the starting day of the week
    const gregFirst = toGregorian(displayYear, displayMonth, 1);
    const firstDate = new Date(
      gregFirst.year,
      gregFirst.month - 1,
      gregFirst.day
    );
    const firstDayOfWeek = firstDate.getDay();

    for (let i = 0; i < firstDayOfWeek; i++) {
      days.push(
        <div 
          key={`empty-start-${i}`} 
          className="p-2 opacity-30"
        ></div>
      );
    }

    for (let i = 1; i <= totalDays; i++) {
      const isCurrentDay =
        i === currentEthDate.day &&
        displayMonth === currentEthDate.month &&
        displayYear === currentEthDate.year;
      const isHoliday = ethiopianPublicHolidays.some(
        (h) => h.month === displayMonth && h.day === i
      );
      const isWeekend = firstDayOfWeek === 0 || firstDayOfWeek === 6;

      let dayClass = "bg-white text-gray-700 border border-gray-100 hover:bg-yellow-50 transition-all duration-200";
      let textClass = "font-medium";
      
      if (isCurrentDay) {
        dayClass = "bg-gradient-to-br from-yellow-500 to-purple-600 text-white shadow-lg transform scale-105 border-0";
        textClass = "font-bold";
      } else if (isHoliday) {
        dayClass = "bg-gradient-to-br from-amber-100 to-orange-100 text-amber-800 border-amber-200 hover:from-amber-200 hover:to-orange-200 shadow-sm";
        textClass = "font-semibold";
      } else if (isWeekend) {
        dayClass = "bg-gray-50 text-gray-500 border-gray-100 hover:bg-gray-100";
      }

      const holiday = isHoliday 
        ? ethiopianPublicHolidays.find((h) => h.month === displayMonth && h.day === i)
        : null;

      days.push(
        <div
          key={i}
          className={`relative flex flex-col items-center justify-center p-3 rounded-xl cursor-pointer ${dayClass}`}
          title={holiday?.name}
        >
          <span className={`text-lg ${textClass}`}>{i}</span>
          {isHoliday && (
            <span className="absolute -top-1 -right-1 text-xs bg-amber-500 text-white rounded-full w-5 h-5 flex items-center justify-center">
              ★
            </span>
          )}
          {isCurrentDay && (
            <div className="absolute -bottom-1 w-3 h-3 bg-white rounded-full border-2 border-yellow-500"></div>
          )}
        </div>
      );
    }

    return days;
  };

  const renderHolidays = () => {
    const monthHolidays = ethiopianPublicHolidays.filter(
      (h) => h.month === displayMonth
    );
    
    return monthHolidays.length > 0 ? (
      <ScrollArea className=" w-full">
        <div className="space-y-3 pr-4">
          {monthHolidays.map((holiday, index) => (
            <div
              key={index}
              className="flex items-center p-4 bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl border border-amber-200 hover:shadow-md transition-all duration-200 group"
            >
              <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center text-white text-lg mr-4 shadow-sm">
                {holiday.icon}
              </div>
              <div className="flex-1">
                <div className="font-semibold text-gray-800 group-hover:text-gray-900">
                  {holiday.name.split(' (')[0]}
                </div>
                <div className="text-sm text-amber-700 font-medium mt-1">
                  {holiday.day} {monthsAmharic[holiday.month - 1]} • {holiday.name.split('(')[1]?.replace(')', '')}
                </div>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    ) : (
      <div className="text-center py-8 bg-gradient-to-br from-gray-50 to-yellow-50 rounded-xl border border-gray-200">
        <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
          <CalendarIcon className="w-8 h-8 text-gray-400" />
        </div>
        <p className="text-gray-500 font-medium">
          ለዚህ ወር ምንም በዓላት የሉም
        </p>
        <p className="text-gray-400 text-sm mt-1">
          No holidays this month
        </p>
      </div>
    );
  };

  const getSeason = (month: number) => {
    if (month >= 1 && month <= 4) return { name: "ክረምት", icon: "☔", color: "from-yellow-400 to-cyan-500" };
    if (month >= 5 && month <= 7) return { name: "ጸደይ", icon: "🌱", color: "from-green-400 to-emerald-500" };
    if (month >= 8 && month <= 10) return { name: "በጋ", icon: "☀️", color: "from-yellow-400 to-orange-500" };
    return { name: "ከፈር", icon: "🍂", color: "from-amber-400 to-red-500" };
  };

  const season = getSeason(displayMonth);

  return (
<div className="min-h-screen w-full bg-gradient-to-br from-slate-50 via-yellow-50 to-cyan-100 p-4">

      <div className=" mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-6xl font-black bg-gradient-to-r from-green-600 via-yellow-600 to-purple-600 bg-clip-text text-transparent mb-4">
            ኢትዮጵያ የቀን መቁጠሪያ
          </h1>
          <p className="text-xl text-gray-600 font-medium">
            Ethiopian Calendar
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Current Date & Time */}
          <div className="space-y-6">
            {/* Current Time Card */}
            <Card className="bg-white/80 backdrop-blur-xl border-0 shadow-2xl rounded-3xl overflow-hidden">
              <CardContent className="p-8">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-yellow-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                      <Clock className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-600">Current Time</h3>
                      <p className="text-2xl md:text-3xl font-black text-gray-800">
                        {currentTime.toLocaleTimeString("en-US", {
                          timeZone: "Africa/Addis_Ababa",
                          hour: "2-digit",
                          minute: "2-digit",
                          second: "2-digit",
                        })}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-black text-green-700 mb-1">
                      {daysAmharic[currentTime.getDay()]}
                    </p>
                    <p className="text-sm text-gray-500">Addis Ababa</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Calendar Comparison Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Ethiopian Date */}
              <Card className="bg-gradient-to-br from-green-500 to-emerald-600 text-white border-0 shadow-2xl rounded-2xl overflow-hidden">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                      <Flag className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-white/90">Ethiopian Calendar</h3>
                      <p className="text-xs text-white/70">ኢትዮጵያዊ ቀን መቁጠሪያ</p>
                    </div>
                  </div>
                  <p className="text-2xl md:text-3xl font-black mb-1">
                    {currentEthDate.day} {monthsAmharic[currentEthDate.month - 1]}
                  </p>
                  <p className="text-lg font-semibold opacity-90">{currentEthDate.year}</p>
                </CardContent>
              </Card>

              {/* Gregorian Date */}
              <Card className="bg-gradient-to-br from-yellow-500 to-cyan-600 text-white border-0 shadow-2xl rounded-2xl overflow-hidden">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                      <CalendarIcon className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-white/90">Gregorian Calendar</h3>
                      <p className="text-xs text-white/70">የግሪጎሪያን ቀን መቁጠሪያ</p>
                    </div>
                  </div>
                  <p className="text-2xl md:text-3xl font-black mb-1">
                    {currentTime.getDate()} {currentTime.toLocaleDateString("en-US", { month: "short" })}
                  </p>
                  <p className="text-lg font-semibold opacity-90">{currentTime.getFullYear()}</p>
                </CardContent>
              </Card>
            </div>

            {/* Season Card */}
            <Card className="bg-gradient-to-br from-orange-400 to-pink-500 text-white border-0 shadow-2xl rounded-2xl overflow-hidden">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Current Season</h3>
                    <p className="text-2xl font-black">{season.name}</p>
                    <p className="text-sm opacity-90 mt-1">Ethiopian Season</p>
                  </div>
                  <div className="text-4xl">{season.icon}</div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Calendar & Holidays */}
          <div className="space-y-6">
            {/* Calendar Card */}
            <Card className="bg-white/80 backdrop-blur-xl border-0 shadow-2xl rounded-3xl overflow-hidden">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <Button 
                    variant="ghost" 
                    onClick={() => changeMonth(-1)}
                    className="w-12 h-12 rounded-xl bg-gray-100 hover:bg-gray-200 transition-all duration-200"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </Button>
                  
                  <div className="text-center">
                    <CardTitle className="text-2xl md:text-3xl font-black bg-gradient-to-r from-green-600 to-yellow-600 bg-clip-text text-transparent">
                      {monthsAmharic[displayMonth - 1]} {displayYear}
                    </CardTitle>
                    <p className="text-sm text-gray-500 font-medium mt-1">
                      {getSeason(displayMonth).name} • {displayMonth}/13
                    </p>
                  </div>
                  
                  <Button 
                    variant="ghost" 
                    onClick={() => changeMonth(1)}
                    className="w-12 h-12 rounded-xl bg-gray-100 hover:bg-gray-200 transition-all duration-200"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </Button>
                </div>
              </CardHeader>
              
              <CardContent>
                {/* Day Headers */}
                <div className="grid grid-cols-7 gap-2 mb-4">
                  {daysAmharic.map((day, index) => (
                    <div
                      key={index}
                      className="text-center font-bold text-sm text-gray-500 uppercase py-3"
                    >
                      {day}
                    </div>
                  ))}
                </div>
                
                {/* Calendar Grid */}
                <div className="grid grid-cols-7 gap-2">
                  {renderMonthDays()}
                </div>

                {/* Legend */}
                <div className="flex items-center justify-center space-x-6 mt-6 pt-4 border-t border-gray-200">
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 bg-gradient-to-br from-yellow-500 to-purple-600 rounded-full"></div>
                    <span className="text-xs text-gray-600">Today</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 bg-gradient-to-br from-amber-100 to-orange-100 rounded-full border border-amber-200"></div>
                    <span className="text-xs text-gray-600">Holiday</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 bg-gray-100 rounded-full"></div>
                    <span className="text-xs text-gray-600">Weekend</span>
                  </div>
                </div>
              </CardContent>
            </Card>

        
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calendar;