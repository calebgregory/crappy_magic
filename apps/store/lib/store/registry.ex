defmodule Store.Registry do
  use GenServer

  def start_link do
    GenServer.start_link(__MODULE__, :ok, [])
  end

  @doc"""
  Looks up the `bucket` associated with a given `id`.
  """
  def lookup(server, id) do
    GenServer.call(server, {:lookup, id})
  end

  @doc"""
  Client call to register a bucket at `id`
  """
  def create(server, id) do
    GenServer.call(server, {:create, id})
  end

  @doc"""
  Called when client calls `start_link`. Initalizes server with init_state of
  %{}.
  """
  def init(:ok) do
    {:ok, %{}}
  end

  @doc"""
  Hander for `lookup`. Returns the `bucket` at that `id` (or `nil`).
  """
  def handle_call({:lookup, id}, _from, state) do
    {:reply, Map.fetch(state, id), state}
  end

  @doc"""
  Hander for `create`. Is synchronous. Returns `:ok`.
  """
  def handle_call({:create, id}, _from, state) do
    if Map.has_key?(state, id) do
      {:reply, :ok, state}
    else
      {:ok, bucket} = Store.Bucket.start_link
      {:reply, :ok, Map.put(state, id, bucket)}
    end
  end
end
