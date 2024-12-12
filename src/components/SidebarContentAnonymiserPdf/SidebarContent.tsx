import React from "react";
import "./SidebarContent.css";

interface SidebarContentProps {
  onSubmit: () => void;
  radioOptions: { id: string; label: string; description: string }[];
  filterOptions: { id: string; label: string }[];
  selectedOption: string;
  setSelectedOption: (option: string) => void;
  selectedFilters: string[];
  setSelectedFilters: (filters: string[]) => void;
  error: string | null;
  isLoading: boolean;
  buttonText: string;
}

const SidebarContent: React.FC<SidebarContentProps> = ({
  onSubmit,
  radioOptions,
  filterOptions,
  selectedOption,
  setSelectedOption,
  selectedFilters,
  setSelectedFilters,
  error,
  isLoading,
  buttonText,
}) => {
  const handleFilterChange = (filter: string) => {
    if (selectedFilters.includes(filter)) {
      setSelectedFilters(selectedFilters.filter((f) => f !== filter));
    } else {
      setSelectedFilters([...selectedFilters, filter]);
    }
  };

  return (
    <div className="sidebar-content">
      <div className="anonymization-options">
        <h3>Mode d'anonymisation</h3>

        {radioOptions.map((option) => (
          <div className="option" key={option.id}>
            <div className="option-radio">
              <input
                type="radio"
                id={option.id}
                name="anonymization"
                value={option.id}
                checked={selectedOption === option.id}
                onChange={(e) => setSelectedOption(e.target.value)}
              />
              <label htmlFor={option.id}>{option.label}</label>
            </div>
            <p className="description">{option.description}</p>

            {option.id === "filter" && selectedOption === "filter" && (
              <div className="filter-options">
                {filterOptions.map((filter) => (
                  <div key={filter.id}>
                    <div className="option-radio">
                      <input
                        type="checkbox"
                        id={filter.id}
                        checked={selectedFilters.includes(filter.id)}
                        onChange={() => handleFilterChange(filter.id)}
                        className="checkbox-filter"
                      />
                      <label
                        className="label-filter-option"
                        htmlFor={filter.id}
                      >
                        {filter.label}
                      </label>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      <button className="submit-button" onClick={onSubmit}>
        {isLoading ? "Anonymisation en cours..." : buttonText}
      </button>
      {error && <p className="error">{error}</p>}
    </div>
  );
};

export default SidebarContent;
