function calculateTotalTarget(startDate, endDate, totalAnnualTarget) {
    const start = new Date(startDate);
    const end = new Date(endDate);
      
      let current = new Date(start);
      let daysExcludingFridays = [];
      let daysWorkedExcludingFridays = [];
      let monthlyTargets = [];
    
      // Helper function to count working days excluding Fridays for a month
      function countWorkingDaysInMonth(year, month) {
        let daysInMonth = new Date(year, month + 1, 0).getDate(); // get the total days in the month
        let workingDays = 0;
    
        for (let day = 1; day <= daysInMonth; day++) {
          let date = new Date(year, month, day);
          let dayOfWeek = date.getDay(); // 5 is Friday
          if (dayOfWeek !== 5) workingDays++; // Exclude Friday
        }
    
        return workingDays;
      }
    
      // Loop through each month between the start and end dates
      while (current <= end) {
        let year = current.getFullYear();
        let month = current.getMonth();
        let totalWorkingDays = countWorkingDaysInMonth(year, month);
        
        daysExcludingFridays.push(totalWorkingDays);
    
        // Calculate worked days between the given start and end dates
        let workedDays = 0;
        for (let day = new Date(current); day.getMonth() === month && day <= end; day.setDate(day.getDate() + 1)) {
          if (day >= start && day.getDay() !== 5) workedDays++;
        }
        daysWorkedExcludingFridays.push(workedDays);
    
        current.setMonth(current.getMonth() + 1); // Move to next month
      }
    
      // Total days worked across the months
      const totalDaysWorked = daysWorkedExcludingFridays.reduce((sum, days) => sum + days, 0);
    
      // Distribute the annual target proportionally
      for (let days of daysWorkedExcludingFridays) {
        monthlyTargets.push((totalAnnualTarget * (days / totalDaysWorked)).toFixed(2));
      }
    
      // Calculate the total target based on worked days
      const totalTarget = monthlyTargets.reduce((sum, target) => sum + parseFloat(target), 0);
    
      return {
        daysExcludingFridays,
        daysWorkedExcludingFridays,
        monthlyTargets,
        totalTarget
      };
    }
    
    // Example usage
    console.log(calculateTotalTarget('2024-01-01', '2024-02-31', 400));