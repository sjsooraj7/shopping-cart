interface FilterBarProps {
    search: string;
    category: string;
    maxPrice: string;
    categories: string[];

    onSearch: (value: string) => void;
    onCategory: (value: string) => void;
    onMaxPrice: (value: string) => void;
    onClear: () => void;
}

export function FilterBar({
    search,
    category,
    maxPrice,
    categories,
    onSearch,
    onCategory,
    onMaxPrice,
    onClear,
}: FilterBarProps) {
    return (
        <div className="card border-0 shadow-sm mb-4">
            <div className="card-body">
                <div className="row g-3">
                    <div className="col-12 col-md-5">
                        <label className="form-label">
                            Title
                        </label>

                        <input
                        className="form-control"
                        value={search}
                        onChange={(event) =>
                            onSearch(event.target.value)
                        }
                        placeholder="Search products..."
                        />
                    </div>
                    <div className="col-12 col-md-3">
                        <label className="form-label">
                        Category
                        </label>

                        <select
                        className="form-select"
                        value={category}
                        onChange={(event) =>
                            onCategory(event.target.value)
                        }
                        >
                            <option value="all">
                                All
                            </option>

                            {categories.map((item) => (
                                <option
                                key={item}
                                value={item}
                                >
                                {item}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="col-12 col-md-2">
                        <label className="form-label">
                            Price
                        </label>

                        <input
                        type="number"
                        min="0"
                        className="form-control"
                        value={maxPrice}
                        onChange={(event) =>
                            onMaxPrice(event.target.value)
                        }
                        placeholder="$100"
                        />
                    </div>
                    <div className="col-12 col-md-2 d-flex align-items-end">
                        <button
                        className="btn btn-outline-secondary w-100"
                        onClick={onClear}
                        >
                        Clear filters
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}