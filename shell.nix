{ pkgs ? import <nixpkgs> {} }:

pkgs.mkShell {
  name = "datever";

  buildInputs = with pkgs; [
    # Markdown linting
    markdownlint-cli

    # For building website (if we add one later)
    # hugo or jekyll could go here
  ];

  shellHook = ''
    echo "DateVer - Date-Based Versioning Specification"
    echo "=============================================="
    echo ""
    echo "Files:"
    echo "  DATEVER.md - The specification"
    echo "  README.md  - Introduction and examples"
    echo ""
    echo "Commands:"
    echo "  markdownlint-cli DATEVER.md README.md - Lint markdown files"
    echo ""
  '';
}
