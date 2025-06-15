
-- Drop existing policies
DROP POLICY IF EXISTS "Allow authenticated users to insert" ON products;
DROP POLICY IF EXISTS "Allow authenticated users to update" ON products; 
DROP POLICY IF EXISTS "Allow authenticated users to delete" ON products;

-- Create new policies that allow operations with service role key
CREATE POLICY "Allow all operations for service role" ON products
  FOR ALL TO service_role
  USING (true)
  WITH CHECK (true);

-- Allow public read access (already exists but let's make sure)
CREATE POLICY "Allow public read access" ON products
  FOR SELECT TO public
  USING (true);

-- Allow insert/update/delete for anon users (for admin operations)
CREATE POLICY "Allow anon insert" ON products
  FOR INSERT TO anon
  WITH CHECK (true);

CREATE POLICY "Allow anon update" ON products
  FOR UPDATE TO anon
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Allow anon delete" ON products
  FOR DELETE TO anon
  USING (true);

-- Also allow authenticated users (for future use)
CREATE POLICY "Allow authenticated insert" ON products
  FOR INSERT TO authenticated
  WITH CHECK (true);

CREATE POLICY "Allow authenticated update" ON products
  FOR UPDATE TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Allow authenticated delete" ON products
  FOR DELETE TO authenticated
  USING (true);
