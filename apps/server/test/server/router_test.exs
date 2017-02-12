defmodule Server.RouterTest do
  use ExUnit.Case, async: true
  use Plug.Test

  @opts Server.Router.init([])

  test "returns slug" do
    # create a test connection
    conn = conn(:get, "/item/12345")

    # invoke the plug
    conn = Server.Router.call(conn, @opts)

    # assert the response and status
    assert conn.state == :sent
    assert conn.status == 200
    assert conn.resp_body == "slug"
  end
end
