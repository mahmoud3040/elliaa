
-- Disable RLS temporarily to clean up
ALTER TABLE products DISABLE ROW LEVEL SECURITY;

-- Drop all existing policies
DROP POLICY IF EXISTS "Allow authenticated users to insert" ON products;
DROP POLICY IF EXISTS "Allow authenticated users to update" ON products; 
DROP POLICY IF EXISTS "Allow authenticated users to delete" ON products;
DROP POLICY IF EXISTS "Allow public read access" ON products;
DROP POLICY IF EXISTS "Allow all operations for service role" ON products;
DROP POLICY IF EXISTS "Allow anon insert" ON products;
DROP POLICY IF EXISTS "Allow anon update" ON products;
DROP POLICY IF EXISTS "Allow anon delete" ON products;

-- Re-enable RLS
ALTER TABLE products ENABLE ROW LEVEL SECURITY;

-- Create simple policies that allow all operations
CREATE POLICY "Enable read access for all users" ON products
  FOR SELECT USING (true);

CREATE POLICY "Enable insert access for all users" ON products
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Enable update access for all users" ON products
  FOR UPDATE USING (true) WITH CHECK (true);

CREATE POLICY "Enable delete access for all users" ON products
  FOR DELETE USING (true);
