import React, { useState } from 'react';

// Simple icon components
const DollarSign = () => <span style={{fontSize: '1.2em'}}>💰</span>;
const Download = () => <span style={{fontSize: '1.2em'}}>⬇️</span>;
const Loader = () => <span style={{fontSize: '1.2em'}}>⏳</span>;
const ArrowRight = () => <span style={{fontSize: '1.2em'}}>→</span>;
const ArrowLeft = () => <span style={{fontSize: '1.2em'}}>←</span>;

export default function FinanceBudgetAI() {
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [plan, setPlan] = useState(null);
  const [formData, setFormData] = useState({
    name: '', totalIncome: '', rentMortgage: '', utilities: '', subscriptions: '', groceries: '', 
    diningOut: '', transportation: '', creditCardDebt: '', creditCardAPR: '', studentLoans: '', 
    studentLoanAPR: '', carLoan: '', carLoanAPR: '', emergencyFund: '', retirementSavings: '', 
    primaryGoal: '', biggestConcern: '', willingToCut: ''
  });

  const handleChange = (e) => setFormData({...formData, [e.target.name]: e.target.value});

  const generate = async () => {
    setLoading(true);
    const prompt = `You are a Certified Financial Planner. Create a comprehensive financial plan for ${formData.name}.

INCOME & EXPENSES:
Monthly Income: $${formData.totalIncome}
Rent/Mortgage: $${formData.rentMortgage}
Utilities: $${formData.utilities}
Subscriptions: $${formData.subscriptions}
Groceries: $${formData.groceries}
Dining Out: $${formData.diningOut}
Transportation: $${formData.transportation}

DEBTS:
Credit Cards: $${formData.creditCardDebt} @ ${formData.creditCardAPR}% APR
Student Loans: $${formData.studentLoans} @ ${formData.studentLoanAPR}% APR
Car Loan: $${formData.carLoan} @ ${formData.carLoanAPR}% APR

CURRENT SAVINGS:
Emergency Fund: $${formData.emergencyFund}
Retirement: $${formData.retirementSavings}

GOALS & CONCERNS:
Primary Goal: ${formData.primaryGoal}
Biggest Concern: ${formData.biggestConcern}
Willing to Cut: ${formData.willingToCut}

Create a detailed financial plan with:
1. EXECUTIVE SUMMARY - Current financial health overview
2. MONTHLY BUDGET - Detailed budget with exact amounts for all categories
3. CASH FLOW ANALYSIS - Income vs expenses breakdown with percentages
4. DEBT ELIMINATION STRATEGY - Month-by-month payoff plan with exact timeline to debt-free
5. EMERGENCY FUND PLAN - How to build 3-6 months expenses with timeline
6. SAVINGS STRATEGY - Retirement and goal-specific savings plans
7. EXPENSE OPTIMIZATION - Specific areas to cut with dollar amounts saved
8. 5-YEAR WEALTH PROJECTION - Year-by-year net worth growth
9. ACTION PLAN - Weekly and monthly financial tasks
10. MILESTONES - Celebrate-worthy financial achievements with dates

Use their actual numbers throughout. Be specific, realistic, and encouraging.`;

    try {
      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 12000,
          messages: [{role: "user", content: prompt}]
        })
      });
      const data = await response.json();
      setPlan(data.content[0].text);
      setCurrentPage(4);
    } catch (error) {
      alert("Error generating plan. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const download = () => {
    const el = document.createElement("a");
    const file = new Blob([plan], {type: 'text/plain'});
    el.href = URL.createObjectURL(file);
    el.download = `${formData.name}_Financial_Plan.txt`;
    document.body.appendChild(el);
    el.click();
    document.body.removeChild(el);
  };

  const inputStyle = {width: '100%', padding: '0.75rem', border: '2px solid #e5e7eb', borderRadius: '8px', fontSize: '1rem'};
  const labelStyle = {display: 'block', fontWeight: '600', marginBottom: '0.5rem'};

  return (
    <div style={{minHeight: '100vh', background: 'linear-gradient(135deg, #FFD700 0%, #FF6B6B 50%, #00E5FF 100%)', padding: '2rem'}}>
      <div style={{maxWidth: '900px', margin: '0 auto', background: 'white', borderRadius: '16px', padding: '3rem', boxShadow: '0 20px 60px rgba(0,0,0,0.3)'}}>
        <div style={{textAlign: 'center', marginBottom: '2rem'}}>
          <div style={{width: '80px', height: '80px', background: 'linear-gradient(135deg, #FFD700 0%, #FF6B6B 50%, #00E5FF 100%)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem', fontSize: '2.5rem'}}>💰</div>
          <h1 style={{fontSize: '2.5rem', fontWeight: '800', marginBottom: '0.5rem', background: 'linear-gradient(135deg, #FFD700 0%, #FF6B6B 50%, #00E5FF 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'}}>Finance & Budget AI</h1>
          <p style={{color: '#6b7280', fontSize: '1.1rem'}}>Your path to financial freedom</p>
        </div>

        {currentPage === 1 && (
          <div style={{display: 'flex', flexDirection: 'column', gap: '1.5rem'}}>
            <h2 style={{fontSize: '1.8rem', fontWeight: '700'}}>Income & Basic Info</h2>
            <div><label style={labelStyle}>Your Name *</label><input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="First name" style={inputStyle}/></div>
            <div><label style={labelStyle}>Total Monthly Income *</label><input type="number" name="totalIncome" value={formData.totalIncome} onChange={handleChange} placeholder="5000" style={inputStyle}/></div>
            <button onClick={() => setCurrentPage(2)} style={{padding: '1rem', background: 'linear-gradient(135deg, #FFD700 0%, #FF6B6B 50%, #00E5FF 100%)', color: 'white', border: 'none', borderRadius: '8px', fontSize: '1.1rem', fontWeight: '600', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem'}}>Continue <ArrowRight size={20}/></button>
          </div>
        )}

        {currentPage === 2 && (
          <div style={{display: 'flex', flexDirection: 'column', gap: '1.5rem'}}>
            <h2 style={{fontSize: '1.8rem', fontWeight: '700'}}>Monthly Expenses</h2>
            <div><label style={labelStyle}>Rent/Mortgage *</label><input type="number" name="rentMortgage" value={formData.rentMortgage} onChange={handleChange} placeholder="1500" style={inputStyle}/></div>
            <div><label style={labelStyle}>Utilities</label><input type="number" name="utilities" value={formData.utilities} onChange={handleChange} placeholder="200" style={inputStyle}/></div>
            <div><label style={labelStyle}>Subscriptions</label><input type="number" name="subscriptions" value={formData.subscriptions} onChange={handleChange} placeholder="100" style={inputStyle}/></div>
            <div><label style={labelStyle}>Groceries</label><input type="number" name="groceries" value={formData.groceries} onChange={handleChange} placeholder="400" style={inputStyle}/></div>
            <div><label style={labelStyle}>Dining Out</label><input type="number" name="diningOut" value={formData.diningOut} onChange={handleChange} placeholder="200" style={inputStyle}/></div>
            <div><label style={labelStyle}>Transportation</label><input type="number" name="transportation" value={formData.transportation} onChange={handleChange} placeholder="300" style={inputStyle}/></div>
            <div style={{display: 'flex', gap: '1rem'}}>
              <button onClick={() => setCurrentPage(1)} style={{flex: 1, padding: '1rem', background: 'white', color: '#00E5FF', border: '2px solid #00E5FF', borderRadius: '8px', fontSize: '1.1rem', fontWeight: '600', cursor: 'pointer'}}><ArrowLeft size={20}/> Back</button>
              <button onClick={() => setCurrentPage(3)} style={{flex: 2, padding: '1rem', background: 'linear-gradient(135deg, #FFD700 0%, #FF6B6B 50%, #00E5FF 100%)', color: 'white', border: 'none', borderRadius: '8px', fontSize: '1.1rem', fontWeight: '600', cursor: 'pointer'}}>Continue <ArrowRight size={20}/></button>
            </div>
          </div>
        )}

        {currentPage === 3 && (
          <div style={{display: 'flex', flexDirection: 'column', gap: '1.5rem'}}>
            <h2 style={{fontSize: '1.8rem', fontWeight: '700'}}>Debts, Savings & Goals</h2>
            <div><label style={labelStyle}>Credit Card Debt</label><input type="number" name="creditCardDebt" value={formData.creditCardDebt} onChange={handleChange} placeholder="5000" style={inputStyle}/></div>
            <div><label style={labelStyle}>Credit Card APR %</label><input type="number" name="creditCardAPR" value={formData.creditCardAPR} onChange={handleChange} placeholder="18.99" style={inputStyle}/></div>
            <div><label style={labelStyle}>Student Loans</label><input type="number" name="studentLoans" value={formData.studentLoans} onChange={handleChange} placeholder="30000" style={inputStyle}/></div>
            <div><label style={labelStyle}>Student Loan APR %</label><input type="number" name="studentLoanAPR" value={formData.studentLoanAPR} onChange={handleChange} placeholder="5.5" style={inputStyle}/></div>
            <div><label style={labelStyle}>Car Loan</label><input type="number" name="carLoan" value={formData.carLoan} onChange={handleChange} placeholder="15000" style={inputStyle}/></div>
            <div><label style={labelStyle}>Car Loan APR %</label><input type="number" name="carLoanAPR" value={formData.carLoanAPR} onChange={handleChange} placeholder="4.5" style={inputStyle}/></div>
            <div><label style={labelStyle}>Emergency Fund</label><input type="number" name="emergencyFund" value={formData.emergencyFund} onChange={handleChange} placeholder="2000" style={inputStyle}/></div>
            <div><label style={labelStyle}>Retirement Savings</label><input type="number" name="retirementSavings" value={formData.retirementSavings} onChange={handleChange} placeholder="10000" style={inputStyle}/></div>
            <div><label style={labelStyle}>Primary Financial Goal *</label><textarea name="primaryGoal" value={formData.primaryGoal} onChange={handleChange} placeholder="e.g., Pay off credit cards in 12 months" style={{...inputStyle, minHeight: '80px', resize: 'vertical'}}/></div>
            <div><label style={labelStyle}>Biggest Financial Concern</label><textarea name="biggestConcern" value={formData.biggestConcern} onChange={handleChange} placeholder="What keeps you up at night financially?" style={{...inputStyle, minHeight: '80px', resize: 'vertical'}}/></div>
            <div><label style={labelStyle}>What Are You Willing to Cut?</label><textarea name="willingToCut" value={formData.willingToCut} onChange={handleChange} placeholder="Expenses you could reduce or eliminate" style={{...inputStyle, minHeight: '80px', resize: 'vertical'}}/></div>
            <div style={{display: 'flex', gap: '1rem'}}>
              <button onClick={() => setCurrentPage(2)} style={{flex: 1, padding: '1rem', background: 'white', color: '#00E5FF', border: '2px solid #00E5FF', borderRadius: '8px', fontSize: '1.1rem', fontWeight: '600', cursor: 'pointer'}}><ArrowLeft size={20}/> Back</button>
              <button onClick={generate} disabled={loading} style={{flex: 2, padding: '1rem', background: loading ? '#9ca3af' : 'linear-gradient(135deg, #FFD700 0%, #FF6B6B 50%, #00E5FF 100%)', color: 'white', border: 'none', borderRadius: '8px', fontSize: '1.1rem', fontWeight: '600', cursor: loading ? 'not-allowed' : 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem'}}>
                {loading ? <><Loader className="spinning" size={20}/>Generating...</> : <>Generate Plan</>}
              </button>
            </div>
          </div>
        )}

        {currentPage === 4 && plan && (
          <div>
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem'}}>
              <h2 style={{fontSize: '1.8rem', fontWeight: '700'}}>Your Financial Plan</h2>
              <button onClick={download} style={{padding: '0.75rem 1.5rem', background: 'linear-gradient(135deg, #FFD700 0%, #FF6B6B 50%, #00E5FF 100%)', color: 'white', border: 'none', borderRadius: '8px', fontWeight: '600', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem'}}><Download size={20}/>Download</button>
            </div>
            <div style={{background: '#f9fafb', padding: '2rem', borderRadius: '12px', marginBottom: '2rem', maxHeight: '600px', overflowY: 'auto', border: '1px solid #e5e7eb'}}>
              <pre style={{whiteSpace: 'pre-wrap', fontFamily: 'Georgia, serif', fontSize: '0.95rem', lineHeight: '1.8', color: '#1a1a1a'}}>{plan}</pre>
            </div>
            <button onClick={() => {setCurrentPage(1); setPlan(null);}} style={{width: '100%', padding: '1rem', background: 'white', color: '#00E5FF', border: '2px solid #00E5FF', borderRadius: '8px', fontSize: '1.1rem', fontWeight: '600', cursor: 'pointer'}}>Create Another Plan</button>
          </div>
        )}
      </div>
      <style>{`@keyframes spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}.spinning{animation:spin 1s linear infinite}`}</style>
    </div>
  );
}