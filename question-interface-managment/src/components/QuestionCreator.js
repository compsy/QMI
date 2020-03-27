
const QuestionPropertyBuilder = (type) => {
  const properties = {type: type};

  return {
    setId: (id) => properties.push({id: id}),
    setSectionStart: (sectionStart) => properties.push({section_start: sectionStart}),
    setShowAfter: (showAfter) => properties.push({show_after: showAfter}),
    setSectionEnd: (sectionEnd) => properties.push({section_end: sectionEnd}),
  }
};
