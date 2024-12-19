<>
          <h2>Select Filter: </h2>
          <Select
            options={searchOptions}
            onChange={(e) => setSearchBy(e.value)}
          />
        </>
        {searchBy === "Category" && (
          <>
            <h2>Select category: </h2>
            <Select
              options={categoryOptions}
              onChange={(e) => setCategory(e.value)}
            />
            <button onClick={searchFilters}>Search</button>{" "}
          </>
        )}
        {searchBy === "Rating" && (
          <>
            <h2>Select min Rating: </h2>
            <Select
              options={ratingOptions}
              onChange={(e) => setMinRating(e.value)}
            />
            <h2>Select max Rating: </h2>
            <Select
              options={ratingOptions}
              onChange={(e) => setMaxRating(e.value)}
            />
            <button onClick={searchFilters}>Search</button>{" "}
          </>
        )}
        {searchBy === "Year of Release" && (
          <>
            <h2>Select min Year: </h2>
            <input
              type="number"
              min={1920}
              max={2024}
              required
              onChange={(e) => setMinYear(e.target.value)}
            />

            <h2>Select max Year: </h2>
            <input
              type="number"
              min={1920}
              max={2024}
              required
              onChange={(e) => setMaxYear(e.target.value)}
            />
            <button onClick={searchFilters}>Search</button>{" "}
          </>
        )}
        {/* <button onClick={searchFilters}>Search</button>{" "} */}
        <button onClick={resetFilters}>Reset Filters</button>