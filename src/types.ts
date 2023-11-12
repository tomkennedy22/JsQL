// Type alias for a partition index, which is a map of keys to arbitrary values.
export type type_partition_index = { [key: string]: any };

// Type definition for a Partition, outlining its structure and methods.
export type type_partition = {
    partition_name: string;
    partition_indices: type_partition_index;
    proto?: any;
    data: { [key: string]: any };
    storage_location: string;
    primary_key: string;
    is_dirty: boolean;
    insert: (data: any) => void;
    update: (data: any[] | any) => void;
    write_to_file: () => Promise<void>;
    delete_file: () => Promise<void>;
}


// Defines the structure for a database table, including its name, indices, storage strategy, and primary key.
export type type_table = {
    table_name: string; // Unique identifier for the table.
    indices: string[]; // List of fields indexed for efficient querying.
    storage_location: string; // File system path where table data is stored.
    primary_key: string; // Field used to uniquely identify records within the table.
    proto?: any; // Prototype object used to instantiate new records.

    // Mappings for partition management based on partition names and primary keys.
    partitions_by_partition_name: { [key: string]: type_partition };
    partition_name_by_primary_key: { [key: string]: string };

    // Methods for data manipulation and retrieval.
    clear: () => Promise<void>;
    next_id: () => number;
    count: () => number;
    insert: (data: any[] | any) => void;
    update: (data: any[] | any) => void;
    find: (query?: type_loose_query) => any[];
    findOne: (query?: type_loose_query) => any;
    output_to_file: () => Promise<void>;
    filter: (data: any, query_field: type_query_field, query_clause: type_query_clause) => any[];
    index_filter: (partitions: type_partition[], index_name: string, query_clause: type_query_clause) => type_partition[];
}

// Defines a query field as a string, representing the field to query within data records.
export type type_query_field = string;

// Enumerates the possible query functions that can be used in a query clause.
export type type_query_function = '$eq' | '$ne' | '$gt' | '$gte' | '$lt' | '$lte' | '$in' | '$nin';

// Represents the structure for a query clause, mapping query functions to their corresponding values.
export type type_query_clause = {
    [key in type_query_function]?: any;
}

// Describes a loose query object that can have any string as a key and any type as a value.
export type type_loose_query = {
    [key: string]: any;
}

// Represents a more specific query structure where keys are tied to either a specific value or a query clause.
export type type_query = {
    [key: string]: number | string | type_query_clause;
}

export type type_database = {
    dbname: string;
    tables: { [key: string]: type_table };
    folder_path: string;
    storage_location: string;
    output_file_path: string;

    add_table: ({ table_name, indices, primary_key, proto }: { table_name: string, indices: string[], primary_key: string, proto: any }) => type_table;
    save_database: () => Promise<void>;
    read_from_file: () => Promise<void>;
}