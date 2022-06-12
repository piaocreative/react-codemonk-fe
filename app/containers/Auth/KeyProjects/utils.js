export const handleSkills = skills => {
  const newSkills = [];
  for (let i = 0; i < skills.length; i++) {
    const temp = {
      label: skills[i].name,
      rating: skills[i].rate,
      value: skills[i].name,
    };
    newSkills.push(temp);
  }
  return newSkills;
};
