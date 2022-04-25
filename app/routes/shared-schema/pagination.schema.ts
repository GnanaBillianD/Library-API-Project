export const pagination = {
  type: 'object',
  properties: {
    end_at: { type: ['number', 'null'] },
    start_at: { type: ['number', 'null'] },
    per_page: { type: 'number' },
    next_page: { type: ['number', 'null'] },
    prev_page: { type: ['number', 'null'] },
    total_count: { type: 'number' },
    total_pages: { type: 'number' },
    current_page: { type: 'number' },
    is_last_page: { type: 'boolean' },
    is_first_page: { type: 'boolean' }
  }
};
