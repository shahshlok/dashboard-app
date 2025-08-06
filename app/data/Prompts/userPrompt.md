Your mission is to transform the specified section of the business report into a single, highly structured JSON object, strictly following the format and style of the provided example.

### EXAMPLE ###
This example shows how to convert the "Competitor Landscape" section into the desired JSON format.

**INPUT SECTION NAME:** `Competitor Landscape`

**INPUT OCR TEXT FOR EXAMPLE:**
(Perfomed by you internally)

**EXPECTED JSON OUTPUT FOR EXAMPLE:**
{
  "competitor_landscape": {
    "summary": "Ashburn and the surrounding Loudoun/Fairfax area host a variety of children's activity providers. We benchmarked key competitors across gymnastics, ninja/parkour, dance, martial arts, swim, and indoor play.",
    "competitors": [
      {
        "name": "Hope Gymnastics Academy",
        "location": "Ashburn",
        "type": "Gymnastics Club",
        "programs_and_capacity": {
          "offerings": ["Rec gymnastics (all levels)", "competitive team (USAG levels 2-10)", "preschool classes"],
          "facility_size_sqft": 12000,
          "equipment": "full equipment"
        },
        "pricing": {
          "monthly_tuition": {"published": false, "estimate": "similar to DDGA (est. $150/mo for 1x/week)"},
          "open_gym": {"price": "$8 weekdays, $10 Sundays", "source_url": "https://www.openpr.com/news/1868607/hope-gymnastics-academy-has-established-monday-sunday-open"},
          "camps": {"available": true, "pricing": "unknown"}
        },
        "differentiators_and_value_prop": "Long-established local gym (former USAG athletes on staff). Emphasis on serious training and Olympic apparatus. Value: Strong coaching pedigree; slightly older facility but good community reputation.",
        "estimated_market_share_enrollment": "~300-400 students (large team + rec)"
      }
    ],
    "key_takeaways": [
      {
        "topic": "Pricing Positioning",
        "finding": "Most structured programs cluster around $100–$160 per month. Hope and G-Force likely charge ~$150, similar to DDGA's base rate of $148. Always In Motion undercuts with $96/week but also offers an aggressive unlimited plan at $140.",
        "conclusion": "DDGA Ashburn can comfortably set its base membership around $148/month. We must clearly communicate the value (Olympic inspiration, state-of-art gym, high coach ratio) to justify the high end and incorporate strategic discounts (sibling, etc.) to remain competitive."
      }
    ]
  }
}

---

### YOUR TASK ###
Now, apply the same logic and format from the example above to the following task.

**SECTION TO FOCUS ON:** `{5. Sensitivity Analysis}`

**FULL DOCUMENT OCR TEXT TO PROCESS:**
{Check Attachment}

Note: You have no limits on the maximum output tokens. The given task is your objective and not counting the tokens
