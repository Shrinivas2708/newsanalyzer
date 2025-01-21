export default function getSentiment(text: string): "positive" | "negative" | "neutral" {
    if (!text || typeof text !== "string") {
      return "neutral";
    }
  
    // Define positive and negative word lists
    const positiveWords =  [
      "abundant", "accomplished", "achieve", "amazing", "amicable", "attractive", 
      "awesome", "beneficial", "blissful", "brilliant", "celebrated", "charismatic",
      "cheerful", "commendable", "compassionate", "confident", "conscientious",
      "constructive", "delightful", "dynamic", "eager", "effective", "efficient",
      "empowering", "encouraging", "endearing", "enthusiastic", "excellent",
      "exceptional", "fabulous", "fantastic", "flourishing", "fortunate",
      "friendly", "generous", "glorious", "good-hearted", "grateful",
      "greatness", "happy", "harmonious", "hopeful", "impressive",
      "inspirational", "joyful", "jubilant", "kind-hearted", 
      "knowledgeable", "lively", "lovable", "magnificent",
      "marvelous", "motivated", "outstanding", 
      "passionate", "peaceful", 
      "positive", "powerful",
     "productive","prosperous","radiant","remarkable","resilient","rewarding",
     "robust","satisfying","sensational","successful","supportive","terrific",
     "thriving","tranquil","trustworthy","uplifting","valuable","vibrant",
     "victorious","wonderful"];
    const negativeWords =  [
      "abysmal","agonizing","alarmed","anguished","annoyed","appalling",
      "awful","bad","bitter","calamitous","catastrophic","crisis",
      "critical","dangerous","deceptive","declining","deplorable",
      "depressing","destructive","detrimental","dismal",
      "disheartening","disappointing","disruptive",
      "dismaying","disturbing","dreadful","downturns","egregious",
      "fearful","futile","gloomy","harmful",
      "horrendous","horrific","hostile",
      "inadequate","inferior","inflexible",
      "ineffective","inefficient","insufficient",
      "intimidating","irritating",
      "jeopardizing","lamentable",
      "lousy","miserable",
      "negative","neglected",
      "negligent","noxious",
      "oppressive","outrageous",
      "painful","pessimistic",
      "pitiful","plague",
      "problems","risky",
      "sad","sorrowful",
      "terrible","threatening",
      "toxic","tragic",
      "troublesome","unacceptable",
      "unfortunate","unpleasant",
      "useful ","violent ",
      "wasted ","worrisome ",
      "wretched"];
  
    // Initialize sentiment score
    let sentimentScore = 0;
  
    // Normalize text
    const normalizedText = text.toLowerCase();
  
    // Calculate positive score
    positiveWords.forEach((word) => {
      if (normalizedText.includes(word)) {
        sentimentScore++;
      }
    });
  
    // Calculate negative score
    negativeWords.forEach((word) => {
      if (normalizedText.includes(word)) {
        sentimentScore--;
      }
    });
  
    // Determine sentiment
    if (sentimentScore > 0) {
      return "positive";
    } else if (sentimentScore < 0) {
      return "negative";
    } else {
      return "neutral";
    }
  }