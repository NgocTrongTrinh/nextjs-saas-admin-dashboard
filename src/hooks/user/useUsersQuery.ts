import { useEffect, useRef, useState } from 'react';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { useRouter, useSearchParams } from 'next/navigation';

import { fetchUsers } from '@/services/api/users';
import { API_KEY } from '@/settings/apiKeys';
import { useDebounce } from '../useDebounce';

export function useUsersQuery() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const isMounted = useRef(false);

  const [page, setPage] = useState(1);
  const [role, setRole] = useState<string | undefined>();
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState<'name' | 'email' | undefined>();
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc' | undefined>();

  const debouncedSearch = useDebounce(search);

  useEffect(() => {
    setPage(Number(searchParams.get('page')) || 1);
    setRole(searchParams.get('role') || undefined);
    setSearch(searchParams.get('search') || '');
    setSortBy(searchParams.get('sortBy') as any);
    setSortOrder(searchParams.get('sortOrder') as any);
  }, []);

  useEffect(() => {
    if (!isMounted.current) {
      isMounted.current = true;
      return;
    }

    const params = new URLSearchParams();
    if (page !== 1) params.set('page', String(page));
    if (role) params.set('role', role);
    if (debouncedSearch) params.set('search', debouncedSearch);
    if (sortBy) params.set('sortBy', sortBy);
    if (sortOrder) params.set('sortOrder', sortOrder);

    router.replace(`?${params.toString()}`);
  }, [page, role, debouncedSearch, sortBy, sortOrder]);

  useEffect(() => {
    setPage(1);
  }, [role, debouncedSearch]);

  const query = useQuery({
    queryKey: [
      API_KEY.USER_LIST,
      page,
      role,
      debouncedSearch,
      sortBy,
      sortOrder,
    ],
    queryFn: () =>
      fetchUsers(page, 10, role, debouncedSearch, sortBy, sortOrder),
    placeholderData: keepPreviousData,
  });

  return {
    ...query,
    page,
    setPage,
    role,
    setRole,
    search,
    setSearch,
    sortBy,
    sortOrder,
    setSortBy,
    setSortOrder,
  };
}
